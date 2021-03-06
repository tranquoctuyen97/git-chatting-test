'use strict';
import {User,Op,Block,Group} from '../models/index';
import {response} from '../helpers/index'

export default class BlockController {
    createBlock = async (req, res, next) => {
        try {
            const {userId,groupId} = req.body;
            const user = req.user;
            console.log(user)
            const block = await Block.create({
                userId,
                groupId,
                authorId: user.id

            });
            return response.returnSuccess(res, block);
        } catch (e) {
            return response.returnError(res, e);
        }
    };
    getListBlockUser = async (req, res, next) => {
        try {
            const user = req.user;
            const blocks = await Block.findAll({
                where: {
                    authorId: user.id,
                    groupId: null
                }
            });
            return response.returnSuccess(res, {blocks});
        } catch (e) {
            return response.returnError(res, e);
        }
    };
    createGroupBlockUser = async (req, res, next) => {
        try {
            const  user = req.user;
            const { id ,groupId } = req.params;
            const author = await Group.find({
                where: {
                    id: groupId,
                    authorId: user.id
                }
            });
            if (!author) {
                return response.returnError(res, new Error('author is not admin group '));
            }
            const block = await Block.create({
                userId: id,
                groupId
            });
            return response.returnSuccess(res, block);
        } catch (e) {
            return response.returnError(res, e);
        }
    };
    deleteGroupBlockUser = async (req, res, next) => {
        try {
            const  user = req.user;
            const { id ,groupId } = req.params;
            const author = await Group.find({
                where: {
                    id: groupId,
                    authorId: user.id
                }
            });
            if (!author) {
                return response.returnError(res, new Error('author is not admin group '));
            }
            const block = await Block.destroy({
                where: {
                    authorId: user.id,
                    userId: id,
                    groupId
                }

            });
            return response.returnSuccess(res, block);
        } catch (e) {
            return response.returnError(res, e);
        }
    };

}