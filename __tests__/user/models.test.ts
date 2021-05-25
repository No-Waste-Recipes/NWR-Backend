import { prismaMock } from '../../singleton'
import {UserModel} from "../../src/user/models";
const Role = require('../../src/utils/userRoles');
const userModel = new UserModel();



test('should not create new user', async () => {
    const user = {
        email: 'joepboekhold+24@gmail.com',
        username: 'Joep53',
        password: 'Welkom01',
        first_name: 'Joep',
        last_name: 'Boekhold',
        description: 'test',
        id: 6,
        role: Role.User
    }

    prismaMock.user.create.mockResolvedValue(user)

    await expect(userModel.createUser(user)).resolves.toEqual(user)
})
