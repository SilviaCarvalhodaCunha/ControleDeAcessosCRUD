import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import createSessionServices from "../services/login/createSession.services";

const createSessionController = async (req: Request, res: Response): Promise<Response> => {
    const userData: TLoginRequest = req.body

    const token : TLoginResponse = await createSessionServices(userData)
    
    return res.status(200).json(token)
}

export default createSessionController