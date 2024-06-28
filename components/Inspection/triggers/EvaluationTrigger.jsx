export const EvaluationTrigger = ({ id,onClick }) => (
    <div className="cursor-pointer no-underline hover:underline" onClick={onClick}>
      <h1 className="text-md font-semibold">{id ? id : ''}</h1>
    </div>
  );