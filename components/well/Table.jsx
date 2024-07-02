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
   
  const invoices = [
    {
      nom: "INV001",
      latitude: "31.456643223445",
      longitude: "5.123456789",
      elevation: "1000",
      date_de_pose:"2001",
      type:"1001",
      type_date :"13/12/2002",
      actions:"Delete"
    },
  ]
   
const TableDemo=({wellDetails})=> {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">nom </TableHead>
            <TableHead className="font-bold">latitude</TableHead>
            <TableHead className="font-bold">longitude</TableHead>
            <TableHead className="font-bold">elevation</TableHead>
            <TableHead className="font-bold">date de pose</TableHead>
            <TableHead className="font-bold">type</TableHead>
            <TableHead className="font-bold">type date</TableHead>
            <TableHead className="font-bold">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

            <TableRow >
              <TableCell className="font-medium">{wellDetails.name}</TableCell>
              <TableCell>{wellDetails.coords.latitude}</TableCell>
              <TableCell>{wellDetails.coords.longitude}</TableCell>
              <TableCell className="">{wellDetails.elevation} m</TableCell>
              <TableCell>{wellDetails.formattedDate}</TableCell>
              <TableCell>{wellDetails.wellType.type}</TableCell>
              <TableCell>{wellDetails.formattedDate}</TableCell>
              <TableCell>
                <ActionDropdown/>
              </TableCell>
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

  export default TableDemo