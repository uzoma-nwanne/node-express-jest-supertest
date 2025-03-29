import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer", "").trim();
    //added trim to remove leading space in authorization token

    // const decode = jwt.verify(
    //   token,process.env.JWT_SECRET ,(err, result) => { return res.status(200).send({ err: err, result: result, }); });

    //jwt verify can accept a callback function which helps in tracing source of error

    const decode = jwt.verify( token, process.env.JWT_SECRET );
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate".e });
  }
};
