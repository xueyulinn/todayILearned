import FactItem from "./FactItem";
const FactList = ({ facts, categories }) => {
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <FactItem key={fact._id} item={fact} categories={categories} />
        ))}
      </ul>
    </section>
  );
};

export default FactList;
