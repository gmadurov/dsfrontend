import DeclaFrom from "./mobile/Finance/DeclaForm";

const Test = ({ leden, allEvents, onEdit, onDelete, pastevent }) => {
  return (
    <>
      <DeclaFrom leden={leden} events={allEvents} onEdit={onEdit} />
    </>
  );
};
export default Test;
