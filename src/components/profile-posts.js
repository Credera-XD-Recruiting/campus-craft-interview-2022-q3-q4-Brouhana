import { removeChildNodes } from '../utils'

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    state,
    city,
  } = data
  const templateId = 'profile-post-item-template'
  const resultCardTemplate = document.getElementById(templateId)
  const clone = document.importNode(resultCardTemplate.content, true)
  const authorName = clone.querySelector('.post-author-info .page-paragraph')
  const jobDesc = clone.querySelector('.post-author-info .page-micro')
  const postNode = clone.querySelector('.post-content')
  const avatarNode = clone.querySelector('.post-author-avatar')
  const locationNode = clone.querySelector(
    '.post-meta-info .post-meta-location',
  )
  const publishDateNode = clone.querySelector(
    '.post-meta-info .post-meta-publishdate',
  )
  const expandCollapsePostButtonNode = clone.querySelector(
    '.post-body-expand-collapse-button',
  )

  const renderPost = () => {
    const MAX_POST_CHARACTERS = 190
    const postCollapsedContent = `${post.slice(0, MAX_POST_CHARACTERS)}&#8230`
    const postContent =
      post.length > MAX_POST_CHARACTERS ? postCollapsedContent : post
    postNode.innerHTML = postContent

    let isPostCollapsed = false
    expandCollapsePostButtonNode.addEventListener('click', () => {
      postNode.innerHTML = isPostCollapsed ? postCollapsedContent : post
      expandCollapsePostButtonNode.innerHTML = isPostCollapsed
        ? 'Continue reading'
        : 'Show less'
      isPostCollapsed = !isPostCollapsed
    })
  }

  renderPost()
  authorName.innerHTML = `${authorFirstName} ${authorLastName}`
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`
  publishDateNode.innerHTML = new Date(publishDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
  // Support to exclude state from content for instances where a city is unlisted
  if (!city && state) {
    locationNode.innerHTML = state
  } else {
    locationNode.innerHTML = `${city}, ${state}`
  }

  if (authorAvatarSrc) {
    const avatarImg = document.createElement('img')
    avatarImg.src = authorAvatarSrc
    avatarImg.setAttribute('aria-label', `${authorFirstName} ${authorLastName}`)
    avatarNode.appendChild(avatarImg)
  } else {
    const firstName = authorFirstName.split(' ').shift().charAt(0)
    const lastName = authorLastName.split(' ').pop().charAt(0)
    const initials = firstName.toUpperCase() + lastName.toUpperCase()

    const avatarInitials = document.createElement('div')
    avatarInitials.className = 'post-author-avatar-initials'
    avatarInitials.innerHTML = initials
    avatarNode.appendChild(avatarInitials)
  }

  return clone
}

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    '#profile-posts .profile-post-results',
  )

  removeChildNodes(pinnedPostsList)

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost)
    pinnedPostsList.appendChild(postNode)
  }
}
