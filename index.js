const axios = require('axios');

const combineQuery = queries => {
  if (typeof queries === 'string') {
    return '?' + queries;
  }
  return '?' + queries.join('&');
}

const buildUserQuery = (admin, statuses) => {
  const adminQuery = `admin=${admin}`;
  const statusQuery = statuses.map(status => `status[]=${status}`).join('&');
  return combineQuery([adminQuery, statusQuery]);
}

const checkUserExists = async userPath => {
  const admin = true;
  const validStatuses = ['active', 'verified'];
  try {
    const users = await fetchData(userPath + buildUserQuery(admin, validStatuses));
    const isExists = users.length === 0;
    return isExists;
  } catch (e) {
    console.error(e);
  }
}

const fetchData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const checkUserGroupExists = async (userPaths) => {
  const results = await Promise.all(userIds.map(async userPath => {
    return await checkUserExists(userPath);
  }));

  return results.some(result => result === true);
}

module.exports = {
  combineQuery: combineQuery,
  buildUserQuery: buildUserQuery
};
