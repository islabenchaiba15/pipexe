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
} from "../../components/ui/table";
import ActionDropdown from "../ActionDropdown";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
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

const TableDemo = ({ manifoldDetails }) => {
  const donwloadFiles = async (fileType) => {
    try {
      const response = await axiosInstance.get(
        `/manifold/download/${manifoldDetails._id}`,
        {
          responseType: "blob",
          params: { fileType }, // Important to handle binary data
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "file.pdf"; // You can set the desired file name here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };
  const download = () => {};
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" font-bold">Name </TableHead>
          <TableHead className="font-bold">Latitude</TableHead>
          <TableHead className="font-bold">Longitude</TableHead>
          <TableHead className="font-bold">Elevation</TableHead>
          <TableHead className="font-bold">Date of installation</TableHead>
          <TableHead className="font-bold  ">Plan</TableHead>

          <TableHead className="font-bold ">Technical sheet</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{manifoldDetails.name}</TableCell>
          <TableCell>{manifoldDetails.coords.latitude}</TableCell>
          <TableCell>{manifoldDetails.coords.longitude}</TableCell>
          <TableCell className="">{manifoldDetails.elevation} m</TableCell>
          <TableCell>{manifoldDetails.formattedDate}</TableCell>
          <TableCell
            onClick={() => donwloadFiles("file")}
            className="cursor-pointer "
          >
            <div className="flex items-center ml-8">
              <CloudDownloadIcon />
            </div>
          </TableCell>
          <TableCell
            onClick={() => donwloadFiles("filePlan")}
            className="cursor-pointer "
          >
            <div className="flex items-center ml-8">
              <CloudDownloadIcon />
            </div>
          </TableCell>
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
