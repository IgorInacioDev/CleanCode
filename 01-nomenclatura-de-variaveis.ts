const categoryList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(request, response) {
  const githubUsername = String(request.query.username)

  if (!githubUsername) {
    return response.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const findGithubUserName = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (findGithubUserName.status === 404) {
    return response.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserData = await findGithubUserName.json()

  const sortByFollowersDescending = categoryList.sort((categoryA, categoryB) =>  categoryB.followers - categoryA.followers); 

  const githubUserCategory = sortByFollowersDescending.find(category => githubUserData.followers > category.followers)

  const result = {
    githubUsername,
    category: githubUserCategory.title
  }

  return result
}

getData({ query: {
  username: 'josepholiveira'
}}, {})