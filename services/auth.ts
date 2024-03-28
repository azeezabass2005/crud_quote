import UserModel, { UserDocumentInt } from "../model/user";

export const createUserService = async (userInformation: any) => {
  try {
    const newUser = await UserModel.create(userInformation)
    if(newUser) {
      return newUser
    }
  } catch (error) {
    throw error
  }
}