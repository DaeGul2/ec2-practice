const User = require('../models/userModel');


exports.createUser = async (req, res) => {
    try {
        const { name, key } = req.body;
        const user = new User({
            name, key
        });
        await user.save();//데이터베이스에 저장 (이전에 게시물 등록하던거랑 같음)
        res.status(201).json(user);
    } catch (e) {

        res.status(500).json(e);

    }
}


exports.login = async (req, res) => {
    try {
        const { name, key } = req.body;

        // 데이터베이스에서 해당 이메일을 가진 사용자를 찾습니다.
        const user = await User.findOne({ name });

        if (!user) {
            // 사용자가 존재하지 않을 때 오류 메시지를 반환합니다.
            return res.status(401).json({ message: '해당 이메일로 등록된 사용자가 없습니다.' });
        }

        // 사용자의 비밀번호와 입력된 비밀번호를 비교합니다.



        if (key == user.key) {
            // 비밀번호가 일치할 때 사용자 정보를 반환합니다.

            console.log("로그인 이전 세션", req.session);
            req.session.isLoggedIn = true; // 로그인 상태를 세션에 저장
            req.session.save((err) => { if (err) throw new Error(err) });
            console.log("로그인 이후 세션", req.session);
            const { name, choose_me, my_select } = user;
            if (user.is_select == 0) {
                res.send(1)
            }
            else {
                res.send(0)
            }
        } else {
            // 비밀번호가 일치하지 않을 때 오류 메시지를 반환합니다.
            console.log('불일치');
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (error) {
        // 오류가 발생한 경우 500 상태 코드와 오류 메시지를 반환합니다.
        console.log(error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

//  exports.logout = async (req, res) => {
//     req.session.destroy();
//     console.log("로그아웃 : ",req.session);
//     res.status(200).send('로그아웃 성공!');
//   }

exports.selectOne = async (req, res) => {
    const { name } = req.body;
    const user = await User.findOne({ name });
    console.log(user)
    if (user.is_select == 0) {  //선택 가능
        const allUsers = await User.find();

        // 'choose_me'가 빈 문자열이고 'name'이 user.name과 다른 문서들을 필터링
        const filteredUsers = allUsers.filter(e => e.choose_me == "" && e.name !== user.name);

        const randomIndex = Math.floor(Math.random() * filteredUsers.length);

        // 랜덤한 문서 가져오기
        const randomUser = filteredUsers[randomIndex];

        await User.findOneAndUpdate(
            { name: randomUser.name },
            { $set: { choose_me: user.name } }
        );

        await User.findOneAndUpdate(
            { name: user.name },
            { $set: { my_select: randomUser.name, is_select: 1 } }
        );

        res.json(randomUser);


    } else {
        res.send("already chose");
    }


}
exports.reset = async (req, res) => {
    try {
        await User.updateMany({}, { $set: { is_select: 0, my_select: "", choose_me: "" } });
        res.status(200).json({ message: '모든 사용자 정보가 리셋되었습니다.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.checkSession = (req, res) => {
    console.log("checkSession", req.session);
    res.send(req.session);

}