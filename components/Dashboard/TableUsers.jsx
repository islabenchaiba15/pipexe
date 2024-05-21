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
import Paging from "../Pagination";

const invoices = [
  {
    nom: "Bnechaiba",
    prenom: "med islam",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "younes",
    prenom: "boutakakine",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position1",
    actions: "delete",
  },
  {
    nom: "azoui",
    prenom: "abdesselam",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position1",
    actions: "delete",
  },
  {
    nom: "bouhnik",
    prenom: "yazid",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "bendhifallah",
    prenom: "soheyb",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "boumagouda",
    prenom: "wail",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "saadi",
    prenom: "anes",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "positionZ",
    actions: "delete",
  },
  {
    nom: "nedjah ",
    prenom: "nazih",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "bensalem",
    prenom: "achraf",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "bourezzane",
    prenom: "rania",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position2",
    actions: "delete",
  },
  {
    nom: "benaouana",
    prenom: "amira",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position1",
    actions: "delete",
  },
  {
    nom: "saihi",
    prenom: "nadjet",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position1",
    actions: "delete",
  },
  {
    nom: "agaguena",
    prenom: "amani",
    email: "mi.benchaiba",
    departement: "departement2",
    position: "position1",
    actions: "delete",
  },
  {
    nom: "benchaiba",
    prenom: "athmane",
    email: "mi.benchaiba",
    departement: "departement1",
    position: "position1",
    actions: "delete",
  },
];

const TableUsers = ({ searchTerm, selectedDepartments, selectedPositions }) => {
  const filteredInvoices = invoices.filter((invoice) => {
    const isNameMatch =
      invoice.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.prenom.toLowerCase().includes(searchTerm.toLowerCase());
    const isDepartmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(invoice.departement);
    const isPositionMatch =
      selectedPositions.length === 0 ||
      selectedPositions.includes(invoice.position);

    return isNameMatch && isDepartmentMatch && isPositionMatch;
  });
  return (
    <div className="pb-24">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">nom </TableHead>
            <TableHead className="font-bold  text-black">prenom</TableHead>
            <TableHead className="font-bold  text-black">
              addresse email
            </TableHead>
            <TableHead className="font-bold  text-black">departement</TableHead>
            <TableHead className="font-bold  text-black">position</TableHead>
            <TableHead className="font-bold  text-black">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.nom}</TableCell>
              <TableCell>{invoice.prenom}</TableCell>
              <TableCell className="">{invoice.email}</TableCell>
              <TableCell>{invoice.departement}</TableCell>
              <TableCell>{invoice.position}</TableCell>
              <TableCell className="flex items-center ml-4">
                <ActionDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paging className="pb-10"/>
    </div>
  );
};

export default TableUsers;
