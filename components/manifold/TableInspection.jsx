import { axiosInstance } from "@/Api/Index";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
import ActionDropdown from "../ActionDropdown"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
   
const TableInspection=({manifoldDetails})=> {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" font-bold">nom </TableHead>
            <TableHead className="font-bold">latitude</TableHead>
            <TableHead className="font-bold">longitude</TableHead>
            <TableHead className="font-bold">elevation</TableHead>
            <TableHead className="font-bold">date de pose</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow >
              <TableCell className="font-medium">{manifoldDetails.name}</TableCell>
              <TableCell>{manifoldDetails.coords.latitude}</TableCell>
              <TableCell>{manifoldDetails.coords.longitude}</TableCell>
              <TableCell className="">{manifoldDetails.elevation} m</TableCell>
              <TableCell>{manifoldDetails.formattedDate}</TableCell>
            </TableRow>
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }

  export default TableInspection