const Food = require('../models/foodChoiceModel');


exports.createFood = async (req, res) => {
    try {
        console.log(req.body);
        const { name, remark, breakfast, launch, dinner } = req.body;
        const food = new Food({
            name, remark, breakfast, launch, dinner
        });
        await food.save();//데이터베이스에 저장 (이전에 게시물 등록하던거랑 같음)
        res.status(201).json(food);
    } catch (e) {

        res.status(500).json(e);

    }
}

exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.query; // 쿼리 파라미터에서 id 가져오기

        // id를 사용하여 Food 모델에서 해당 문서를 찾고 삭제
        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({ message: '해당 ID를 가진 문서를 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '문서가 성공적으로 삭제되었습니다.' });

    } catch (e) {
        res.status(500).json(e);
    }
}

exports.getFood = async (req, res) => {
    try {
        const foodChoices = await Food.find(); // 모든 문서를 찾음
        res.status(200).json(foodChoices); // 클라이언트에게 반환

    }
    catch (e) {
        res.status(500).json(e)
    }
}

exports.deleteAll = async (req, res) => {
    try {
        await Food.deleteMany(); // 모든 문서를 삭제
        res.status(200).json({ message: 'All documents deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};