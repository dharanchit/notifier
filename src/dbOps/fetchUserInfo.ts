import { UserInfo } from '../types'
import dbConnectionClient from '../utils/dbConnection'

const fetchUserInfo = async (userEmail: string): Promise<UserInfo | null> => {
  const dbClient = dbConnectionClient()
  try {
    await dbClient.connect();
    const userObject = await dbClient.query(
      'SELECT * FROM users_table WHERE email=$1',
      [userEmail],
    );
    const userData = userObject.rows ? userObject.rows[0] : null;
    return userData;
  } catch (err) {
    console.error('Error occurred while fetching user data', err);
    return null;
  }
}

export default fetchUserInfo
