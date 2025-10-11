import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { useCallback, useEffect, useState } from "react";

//  title, place_of_origin, artist_display, inscriptions, date_start, date_end

interface Data {
  id: number;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

interface ColumnMeta {
  field: string;
  header: string;
}

function Hero() {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<boolean>(false);
  const totalPages = 129887;

  const columns: ColumnMeta[] = [
    { field: "id", header: "Id" },
    { field: "place_of_origin", header: "Place of Origin" },
    { field: "artist_display", header: "Artist Display" },
    { field: "date_start", header: "Date Start" },
    { field: "date_end", header: "Date End" },
  ];
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );

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

      { loading?  (
      //Loading Spin
        <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        <span className='ml-3 text-gray-600'>Loading Data...</span>
      </div>
      ) :
      // Fetched DATA
      (<div>
        <DataTable value={data} tableStyle={{ minWidth: "30rem" }}>
        <Column field="id" header="ID" style={{ width: '80px' }} />
  <Column field="place_of_origin" header="Origin" style={{ width: '120px' }} />
  <Column field="artist_display" header="Artist" style={{ width: '350px' }} />
  <Column field="date_start" header="Start" style={{ width: '100px' }} />
  <Column field="date_end" header="End" style={{ width: '100px' }} />
        </DataTable>
      </div>)  
     
      }

    {/* Pagination-part */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between">
      <div className="text-sm text-gray-700">
        Showing Pages :
      </div>
    
      <div className="flex items-center gap-4">
      <div className="">
      <button
                disabled={!prevPage}
                onClick={() => setPage(page - 1)}
                className='md:px-3 px-1 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
      </div>

      <div className="flex items-center gap-2">
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

              <div className="flex items-center gap-2">
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
