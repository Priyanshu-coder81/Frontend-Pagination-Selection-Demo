import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";


//  title, place_of_origin, artist_display, inscriptions, date_start, date_end

interface Data {
   id: number,
   place_of_origin : string,
   artist_display: string,
   inscriptions: string,
   date_start: string,
   date_end: string,
}


interface ColumnMeta {
    field: string;
    header: string;
}

function Hero() {
    const [data, setData] = useState<Data[]>([]);


    const columns: ColumnMeta[] = [
        {field: 'id', header: 'Id'},
        {field: 'place_of_origin', header: 'Place of Origin'},
        {field: 'artist_display', header: 'Artist Display'},
        {field: 'date_start', header: 'Date Start'},
        {field: 'date_end', header: 'Date End'}
    ];



return(
    <div className="px-8 py-6 ">
        <div className="flex gap-8 mb-8 justify-center">
            <h1 className="pb-2 text-lg font-medium border-b-2 transition-colors text-black border-blue-600">
        Customized View
        </h1>
        </div>
        <div>
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    {columns.map((col, _) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                </DataTable>
        </div>
    </div>
);
}

export default Hero;