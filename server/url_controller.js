import { get } from "axios";
import { load } from "cheerio";
import { object, string, ValidationError } from "yup";

const schema = object({
  url: string().url().required(),
});

const getUrlPreview = async (req, res) => {
  try {
    const value = await schema.validate(req.body);

    const { data } = await get(value.url);
    const $ = load(data);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[property="description"]').attr("content");
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $("img").first().attr("src");

    const previewData = {
      title: title || "No title available",
      description: description || "No description available",
      image: image || "No image available",
    };

    return res.status(200).json(previewData);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).send(err.message);
    }

    console.log(err);

    return res.status(500).send("Something went wrong!");
  }
};

export default {
  getUrlPreview,
};