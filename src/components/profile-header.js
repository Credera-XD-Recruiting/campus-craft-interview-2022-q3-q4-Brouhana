import underlineSrc from '../assets/underline.svg'

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc, jobTitle, companyName } = data
  const headerNode = document.querySelector('#profile-header .profile-header')
  const profileAvatarNode = headerNode.querySelector('img')
  const nameNode = headerNode.querySelector('.profile-info .profile-info-name')
  const headlineNode = headerNode.querySelector(
    '.profile-info .profile-info-headline',
  )
  const underlineNode = headerNode.querySelector('.profile-underline')
  underlineNode.setAttribute('src', underlineSrc)

  nameNode.classList.remove('loading', 'skeleton-block', 'skeleton-block--half')
  headlineNode.classList.remove(
    'loading',
    'skeleton-block',
    'skeleton-block--quarter',
  )

  nameNode.innerHTML = `${firstName} ${lastName}`
  nameNode.appendChild(underlineNode)
  headlineNode.innerHTML = `${jobTitle} @ ${companyName}`
  profileAvatarNode.src = avatarSrc
  profileAvatarNode.setAttribute('aria-label', `${firstName} ${lastName}`)

  if (!avatarSrc) {
    profileAvatarNode.remove()
  }
}
