import PromptCardList from "./PromptCardList.jsx";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name === "My" ? name : `${name}'s`} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <PromptCardList
        data={data}
        handleTagClick={() => {}}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Profile;
