import { removeChildNodes } from '../utils'

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data
  const templateId = 'friend-list-item-template'
  const resultCardTemplate = document.getElementById(templateId)
  const clone = document.importNode(resultCardTemplate.content, true)
  const nameNode = clone.querySelector('p.page-paragraph')
  const titleNode = clone.querySelector('p.page-micro')
  const avatarNode = clone.querySelector('.profile-list-item-avatar')
  const topFriendNode = clone.querySelector('.top-friend-flag')

  nameNode.innerHTML = `${name}`
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`
  avatarNode.src = avatarSrc
  avatarNode.setAttribute('aria-label', `${name}`)

  if (topFriend) {
    topFriendNode.innerHTML = 'Top Friend'
  } else {
    topFriendNode.remove()
  }

  if (avatarSrc) {
    const avatarImg = document.createElement('img')
    avatarImg.src = avatarSrc
    avatarImg.setAttribute('aria-label', `${name}`)
    avatarNode.appendChild(avatarImg)
  }

  return clone
}

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    '#profile-friends .profile-friends-list',
  )

  const sortFriendsAlpha = (friends) => {
    friends.sort((friendA, friendB) => {
      let afriendA = friendA.name.toLowerCase().split(' ').pop()
      let afriendB = friendB.name.toLowerCase().split(' ').pop()
      return afriendA.localeCompare(afriendB)
    })
    return friends
  }

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection)

    const allFriends = resultsData.friends
    const topFriends = sortFriendsAlpha(
      allFriends.filter((friend) => friend.topFriend),
    )
    const normalFriends = sortFriendsAlpha(
      allFriends.filter((friend) => !friend.topFriend),
    )

    for (let friend of topFriends) {
      const topFriendsNode = generateListItemNode(friend)
      friendsListSection.appendChild(topFriendsNode)
    }

    for (let friend of normalFriends) {
      const normalFriendsNode = generateListItemNode(friend)
      friendsListSection.appendChild(normalFriendsNode)
    }
  }
}
