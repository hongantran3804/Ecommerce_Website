import User from "@models/User";
import bcrypt from "bcrypt"
export const PUT = async (request) => {
  const { userId, newValue, fieldChange ,oldPwd, newPwd, newPwd2} = await request.json();

  if (userId) {
    try {
      const user = await User.findOne({ _id:userId });
      if (fieldChange === "password") {
        const isMatch = await bcrypt.compare(oldPwd, user.password);
        if (isMatch && (newPwd === newPwd2)) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPwd, salt);
          user.password = hashedPassword;
          await user.save()
        }
        console.log(user);
      }
      else if (fieldChange === "name") {
        await User.findByIdAndUpdate({ _id: userId }, { name: newValue });
      } else if (fieldChange === "phone") {
        await User.findByIdAndUpdate({ _id: userId }, { phone: newValue });
      } else if (fieldChange === "company") {
        await User.findByIdAndUpdate({ _id: userId }, { compName: newValue });
      }
      return new Response(null, { status: 200 });
    } catch (error) {
      console.log(error)
    }
  }
  return new Response(null, { status: 422 });
};
