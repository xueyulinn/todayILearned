const { ObjectId } = require("mongodb");
const getAllFacts = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const curCategory = req.query.curCategory;
    const filter = curCategory === "all" ? {} : { category: curCategory };
    const collection = await db.collection("facts");
    const facts = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(facts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addOneFact = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { fact, source, category } = req.body;
    const createdAt = new Date().toISOString();
    const newFact = {
      fact,
      source,
      category,
      createdAt,
      emojis: [],
    };
    const collection = db.collection("facts");
    const result = await collection.insertOne(newFact);
    res
      .status(200)
      .json(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateEmojis = async (req, res) => {
  try {
    const { emojiImg, factId } = req.body;
    const objectId = new ObjectId(factId);

    const db = req.app.locals.db;
    const collection = db.collection("facts");

    const document = await collection.findOne({ _id: objectId });

    const existingEmoji = document.emojis?.find(
      (curEmoji) => curEmoji.img === emojiImg
    );

    if (!existingEmoji) {
      await collection.updateOne(
        { _id: objectId },
        { $push: { emojis: { img: emojiImg, count: 1 } } }
      );
    } else {
      await collection.updateOne(
        { _id: objectId, "emojis.img": emojiImg },
        { $inc: { "emojis.$.count": 1 } }
      );
    }
    const updatedDoc = await collection.findOne({ _id: objectId });

    return res.status(200).json({
      message: "Emoji updated successfully.",
      emojis: updatedDoc.emojis,
    });
  } catch (error) {
    console.error("updateEmojis error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllFacts, addOneFact, updateEmojis };
