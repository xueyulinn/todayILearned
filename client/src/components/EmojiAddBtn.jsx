import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

const EmojiAddButton = ({ onClick }) => {
  return (
    <button className="emoji-btn" onClick={onClick}>
      <MdOutlineEmojiEmotions />
      <FiPlus />
    </button>
  );
};

export default EmojiAddButton;
