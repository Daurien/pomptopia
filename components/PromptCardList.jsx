import PromptCard from "./PromptCard.jsx";

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
