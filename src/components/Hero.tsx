import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

//  title, place_of_origin, artist_display, inscriptions, date_start, date_end

interface Data {
  id: number;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

function Hero() {
  const [data, setData] = useState<Data[]>([]);

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<boolean>(false);
  const [totalPages,setTotalPages] = useState<number>(0);

  const overlayRef = useRef<OverlayPanel>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [selectNValue, setSelectedNValue] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);

  const cleanData = (items: any[]): Data[] => {
    return items.map(
      ({
        id,
        title,
        place_of_origin,
        artist_display,
        inscriptions,
        date_start,
        date_end,
      }: any) => ({
        id,
        title,
        place_of_origin,
        artist_display,
        inscriptions,
        date_start,
        date_end,
      })
    );
  };

  const downArrow = () => {
    return (
      <div className='flex items-center gap-2'>
        <button
          className='text-black text-xl p-2 rounded-xl border-gray-200 border-b-current'
          onClick={(e) => overlayRef.current?.toggle(e)}
          data-pr-tooltip='Select n rows'
          data-pr-at='top'
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
    );
  };

  const handleSelectN = async () => {
    const n = parseInt(selectNValue);
    if (isNaN(n) || n <= 0) {
      setSelectedRows(new Set());
      setSelectedNValue("");
      overlayRef.current?.hide();
      return;
    }
    setLoading(true);
    const newSelectedIds = new Set<number>();
    let currentFetchedCount = 0;
    let currentPage = 1;
    const maxPossibleItems = totalItems > 0 ? totalItems : n;

    while (currentFetchedCount < n && currentFetchedCount < maxPossibleItems) {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/artworks?page=${currentPage}`
        );
        const cleanedData = cleanData(response.data.data);

        if (totalItems === 0 || itemsPerPage == 0) {
          setTotalItems(response.data.pagination.total);
          setItemsPerPage(response.data.pagination.limit);
        }

        for (const item of cleanedData) {
          if (currentFetchedCount < n) {
            newSelectedIds.add(item.id);
            currentFetchedCount++;
          } else {
            break;
          }
        }

        if (
          response.data.pagination.next_url == null ||
          currentFetchedCount >= n
        ) {
          break;
        }

        currentPage++;
      } catch (err) {
        console.log("Error while fetching data for selection : ", err);
        break;
      }
    }

    setSelectedRows(newSelectedIds);
    setLoading(false);
    setSelectedNValue("");
    overlayRef.current?.hide();
  };

  const selectionChange = (e) => {
    const currentVisiblePageIds = new Set(data.map((item) => item.id));
    const newlySelectedOnPageIds = new Set(
      e.value.map((item: Data) => item.id)
    );

    const updatedSelectedRows = new Set(selectedRows);

    currentVisiblePageIds.forEach((id) => {
      if (!newlySelectedOnPageIds.has(id)) {
        updatedSelectedRows.delete(id);
      }
    });

    newlySelectedOnPageIds.forEach((id) => {
      updatedSelectedRows.add(id);
    });
    setSelectedRows(updatedSelectedRows);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      setTotalPages(response.data.pagination.total);
      const cleanedData = cleanData(response.data.data);

      setData(cleanedData);

      setPrevPage(page > 1);
      setNextPage(response.data.pagination.next_url !== null);
    } catch (err) {
      console.log("Error while fetching the data : ", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='px-5 md:px-8 lg:px-15 py-6 '>
      <div className='flex gap-8 mb-8 justify-center'>
        <h1 className='pb-2 text-lg font-medium border-b-2 transition-colors text-black border-blue-600'>
          Customized View
        </h1>
      </div>

      <OverlayPanel ref={overlayRef}>
        <div className='p-3'>
          <label htmlFor='selctN' className='block tex-sm font-medium mb-2'>
            Select First N rows:
          </label>
          <div className='flex gap-2'>
            <InputText
              id='selectN'
              value={selectNValue}
              onChange={(e) => setSelectedNValue(e.target.value)}
              placeholder='Enter a Number'
              type='number'
              min='1'
              max={totalItems > 0 ? totalItems : undefined}
              className='w-32'
            />
            <Button
              label='Select'
              onClick={handleSelectN}
              disabled={
                !selectNValue ||
                parseInt(selectNValue) <= 0 ||
                isNaN(parseInt(selectNValue))
              }
              size='small'
            ></Button>
          </div>
        </div>
      </OverlayPanel>

      {loading ? (
        //Loading Spin
        <div className='flex justify-center items-center py-12'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-3 text-gray-600'>Loading Data...</span>
        </div>
      ) : (
        // Fetched DATA

        <DataTable
          value={data}
          selectionMode='checkbox'
          selection={data.filter((item) => selectedRows.has(item.id))}
          onSelectionChange={(e) => selectionChange(e)}
          dataKey='id'
          tableStyle={{ minWidth: "50rem" }}
          className="flex justify-center"
        >
          <Column
            selectionMode='multiple'
            header={downArrow}
            headerStyle={{ width: "1rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column field='id' header='ID' style={{ width: "80px" }} />
          <Column
            field='place_of_origin'
            header='Origin'
            style={{ width: "80px" }}
          />
          <Column
            field='artist_display'
            header='Artist'
            style={{ width: "400px" }}
          />
          <Column
            field='inscriptions'
            header='Inscriptions'
            style={{ width: "400px" }}
          />
          <Column
            field='date_start'
            header='Start'
            style={{ width: "80px" }}
          />
          <Column field='date_end' header='End' style={{ width: "80px" }} />
        </DataTable>
      )}

      {/* Pagination-part */}
      <div className='flex flex-col sm:flex-row gap-4 mt-6 justify-between'>
        <div className='text-sm text-gray-700'>Showing Pages :</div>

        <div className='flex items-center gap-4'>
          <div className=''>
            <button
              disabled={!prevPage}
              onClick={() => setPage(page - 1)}
              className='md:px-3 px-1 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>
          </div>

          <div className='flex items-center gap-2'>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    pageNum === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <div className='flex items-center gap-2'>
            <button
              disabled={!nextPage}
              onClick={() => setPage(page + 1)}
              className='md:px-3 px-1 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
