import AddTaskIcon from '@mui/icons-material/AddTask';
export const ResultTrigger = ({ id,inspection,onClick }) => (
    <div className="cursor-pointer no-underline hover:underline" onClick={onClick}>
      <h1 className="text-md font-semibold">{id && inspection.inspection.status==="updated" ? <AddTaskIcon fontSize="small"/> : ''}</h1>
    </div>
  );