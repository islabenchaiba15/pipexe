import AddTaskIcon from '@mui/icons-material/AddTask';
export const ResultTrigger = ({ id,onClick }) => (
    <div className="cursor-pointer no-underline hover:underline" onClick={onClick}>
      <h1 className="text-md font-semibold">{id ? <AddTaskIcon fontSize="small"/> : ''}</h1>
    </div>
  );