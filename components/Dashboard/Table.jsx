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
  {
    nom: "INV002",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
  {
    nom: "INV003",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
  {
    nom: "INV004",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
  {
    nom: "INV005",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
  {
    nom: "INV006",
    latitude: "31.456643223445",
    longitude: "5.123456789",
    elevation: "1000",
    date_de_pose: "2001",
    type: "1001",
    type_date: "13/12/2002",
    actions: "Delete",
  },
];

const TableDemo = () => {
  return (
    <Table>
      <TableCaption>A list of your wells.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Name</TableHead>
          <TableHead className="font-bold">Latitude</TableHead>
          <TableHead className="font-bold">Longitude</TableHead>
          <TableHead className="font-bold">Elevation</TableHead>
          <TableHead className="font-bold">Date of installation</TableHead>
          <TableHead className="font-bold">Type</TableHead>
          <TableHead className="font-bold">Type date</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.nom}</TableCell>
            <TableCell>{invoice.latitude}</TableCell>
            <TableCell>{invoice.longitude}</TableCell>
            <TableCell className="">{invoice.elevation}</TableCell>
            <TableCell>{invoice.date_de_pose}</TableCell>
            <TableCell>{invoice.type}</TableCell>
            <TableCell>{invoice.type_date}</TableCell>
            <TableCell>{invoice.actions}</TableCell>
          </TableRow>
        ))}
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
