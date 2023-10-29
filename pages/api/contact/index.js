import { apiHandler, messageRepo } from 'helpers/api';

export default apiHandler({
    post: sendMessage
});

async function sendMessage(req, res) {
    await messageRepo.sendMessage(req.body);
    return res.status(200).json({});
}
