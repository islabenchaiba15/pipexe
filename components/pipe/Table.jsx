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
   
  const invoices = [
    {
      source: "INV001",
      destination: "INV002",
      diametre: "250.00",
      longeur: "1000",
      année_de_pose:"2001",
      entrée:"1001",
      obseravation:"No observation",
      date_de_maj:"2001",
      actions:"Delete"
    },
    {
        source: "INV001",
        destination: "INV002",
        diametre: "250.00",
        longeur: "1000",
        année_de_pose:"2001",
        entrée:"1001",
        obseravation:"No observation",
        date_de_maj:"2001",
        actions:"Delete"
    },
    {
        source: "INV001",
        destination: "INV002",
        diametre: "250.00",
        longeur: "1000",
        année_de_pose:"2001",
        entrée:"1001",
        obseravation:"No observation",
        date_de_maj:"2001",
        actions:"Delete"
    },
    {
        source: "INV001",
        destination: "INV002",
        diametre: "250.00",
        longeur: "1000",
        année_de_pose:"2001",
        entrée:"1001",
        obseravation:"No observation",
        date_de_maj:"2001",
        actions:"Delete"
    },
  ]
   
const TableDemo=()=> {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Source </TableHead>
            <TableHead className="font-bold">destination</TableHead>
            <TableHead className="font-bold">diametre.("")</TableHead>
            <TableHead className="font-bold">Longeur.("m")</TableHead>
            <TableHead className="font-bold">Année de pose</TableHead>
            <TableHead className="font-bold">N°entrée</TableHead>
            <TableHead className="font-bold">obseravation</TableHead>
            <TableHead className="font-bold">date de maj</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.source}</TableCell>
              <TableCell>{invoice.destination}</TableCell>
              <TableCell>{invoice.diametre}</TableCell>
              <TableCell className="">{invoice.longeur}</TableCell>
              <TableCell>{invoice.année_de_pose}</TableCell>
              <TableCell>{invoice.entrée}</TableCell>
              <TableCell>{invoice.obseravation}</TableCell>
              <TableCell>{invoice.date_de_maj}</TableCell>
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
    )
  }

  export default TableDemo