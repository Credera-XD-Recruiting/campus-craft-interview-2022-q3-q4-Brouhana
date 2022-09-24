import { removeChildNodes } from '../utils'

const activityStates = {
  active: 'active',
  inactive: 'inactive',
  moderate: 'moderate',
  low: 'low',
}
/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const { name, href, image, activity, favorite } = data
  const templateId = 'profile-group-results-item-template'
  const resultCardTemplate = document.getElementById(templateId)
  const clone = document.importNode(resultCardTemplate.content, true)
  const titleNode = clone.querySelector('p.page-paragraph')
  const referenceNode = clone.querySelector('a.profile-group-results-card')
  const groupImageNode = clone.querySelector('a.profile-group-results-card img')
  const groupResultsCard = clone.querySelector('.profile-group-results-card')
  const favoriteIconNode = clone.querySelector('.profile-group-favorite')

  if (!favorite) favoriteIconNode.remove()

  let activityClassName = 'profile-group-results-card-'
  switch (activity) {
    case 'active':
      activityClassName += 'active'
      break
    case 'moderate':
      activityClassName += 'moderate'
      break
    case 'low':
      activityClassName += 'low'
      break
    case 'inactive':
      activityClassName += 'inactive'
      break
  }
  groupResultsCard.classList.add(activityClassName)

  titleNode.innerHTML = `${name}`
  referenceNode.href = href
  groupImageNode.src = image

  return clone
}

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateProfileGroupItemsFromTemplate = (resultsData) => {
  const profileGroupsList = document.querySelector(
    '#profile-groups .profile-group-results',
  )

  removeChildNodes(profileGroupsList)

  if (resultsData.groups && resultsData.groups.length > 0) {
    for (let i = 0; i < resultsData.groups.length; i++) {
      const groupNode = generateCardNode(resultsData.groups[i])
      profileGroupsList.appendChild(groupNode)
    }
  }
}
