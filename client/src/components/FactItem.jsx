import EmojiPicker from "emoji-picker-react";
import EmojiAddButton from "./EmojiAddBtn";
import axios from "axios";
import { BASE_URL } from "../apiPath";
import { useState } from "react";
const FactItem = ({ item, categories }) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emojis, setEmojis] = useState(item.emojis);
  const handleClick = async (emojiData) => {
    try {
      const emojiImg = emojiData.emoji;
      const res = await axios.put(BASE_URL + "/facts", {
        factId: item._id,
        emojiImg,
      });
      setEmojis(res.data.emojis);
      setOpenEmoji(!openEmoji);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <li className="fact">
      <p>
        {item.fact}
        <a className="source" href={item.source} target="_blank">
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find(
            (curCategory) => curCategory.name === item.category
          ).color,
        }}
      >
        #{item.category}#
      </span>
      <div className="reactions">
        {emojis &&
          emojis.map((curEmoji) => (
            <button key={curEmoji.img} className="emoji-btn">
              {curEmoji.img}
              {curEmoji.count}
            </button>
          ))}
        <EmojiAddButton onClick={() => setOpenEmoji(!openEmoji)} />

        <EmojiPicker
          open={openEmoji}
          defaultSkinTone={"neutral"}
          onEmojiClick={(emojiData) => {
            handleClick(emojiData);
          }}
        />
      </div>
    </li>
  );
};

export default FactItem;
