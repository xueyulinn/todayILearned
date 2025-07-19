import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BASE_URL } from "../apiPath";
const FactItem = ({ item, categories }) => {
  const [openEmoji, setOpenEmoji] = useState(true);
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
    <div className="min-h-[6rem] bg-stone-700 text-[20px] tracking-[-1px] mb-4 flex flex-col gap-[8px] items-start rounded-2xl">
      <div className="w-full">
        <p className="break-words whitespace-normal">
          {item.fact}
          <a className="source" href={item.source} target="_blank">
            (source)
          </a>
        </p>
      </div>
      <div
        className="tag"
        style={{
          backgroundColor: categories.find(
            (curCategory) => curCategory.name === item.category
          ).color,
        }}
      >
        #{item.category}#
      </div>
      <div className="reactions">
        {emojis &&
          emojis.map((curEmoji) => (
            <button key={curEmoji.img} className="emoji-btn">
              {curEmoji.img}
              {curEmoji.count}
            </button>
          ))}
      </div>
      <EmojiPicker
        previewConfig={{ showPreview: false }}
        searchDisabled={true}
        reactionsDefaultOpen
        skinTonesDisabled
        open={openEmoji}
        defaultSkinTone="neutral"
        onEmojiClick={(emojiData) => handleClick(emojiData)}
        allowExpandReactions={false}
        style={{
          "--epr-emoji-size": "20px",
          "--epr-bg-color": "#f8fafc",
          backgroundColor: "#44403c",
          border: "none",
        }}
        reactions={[
          "1f44d",
          "1f44e",
          "2705",
          "274c",
          "1f44f",
          "1f628",
          "1f92f",
        ]}
      />
    </div>
  );
};

export default FactItem;
