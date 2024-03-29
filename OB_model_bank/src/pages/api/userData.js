import User from "../../server/model/user";
import { authProcess } from './../../server/utils/withAuth';
import dbConnect from "../../server/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    await authProcess(req, res);

    if (req.method === 'GET') {
        const user = await User.findById(req.query.userID);

        return res.status(200).json({
            balance: user.balance,
            bankNumber: user.bankNumber,
            currency: user.currency,
            username: user.username
        });
    } else if (req.method === 'POST') {
        await User.findByIdAndUpdate(req.query.userID, req.body);

        return res.status(200).json({
            success: true
        });
    }
}
export default handler;