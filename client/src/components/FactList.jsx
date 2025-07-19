import FactItem from "./FactItem";
const FactList = ({ facts, categories }) => {
  return (
    <section>
      <div className="flex flex-col gap-4">
        {facts.length > 0 &&
          facts.map((fact) => (
            <FactItem key={fact._id} item={fact} categories={categories} />
          ))}
      </div>
    </section>
  );
};

export default FactList;
