import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ActionDropdown from "../ActionDropdown";

const invoices = [
  {
    nom: "INV001",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
];

const TableDemo = ({ junctionDetails }) => {
  return (
    <Table>
      <TableCaption>A list of your junctions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" font-bold">Name</TableHead>
          <TableHead className="font-bold">Latitude</TableHead>
          <TableHead className="font-bold">Longitude</TableHead>
          <TableHead className="font-bold">Elevation</TableHead>
          <TableHead className="font-bold">Date of installation</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{junctionDetails.name}</TableCell>
          <TableCell>{junctionDetails.coords.latitude}</TableCell>
          <TableCell>{junctionDetails.coords.longitude}</TableCell>
          <TableCell className="">{junctionDetails.elevation} m</TableCell>
          <TableCell>{junctionDetails.formattedDate}</TableCell>
          <TableCell className="flex items-center ml-4">
            <ActionDropdown />
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
  );
};

export default TableDemo;
