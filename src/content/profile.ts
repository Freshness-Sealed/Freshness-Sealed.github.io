/**
 * Everything personal lives here. Edit this file to update the site.
 */
export const profile = {
  name: 'Jiamin Cheng',
  /** Used as the page's hidden heading */
  shortName: 'Jiamin',
  /** Short tagline under your name and email on the home page */
  tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  /** One paragraph per array item. Placeholder text until the real bio is written. */
  bio: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  ],
  /** Path under /public (square crops look best in the frame) */
  photo: '/profile.jpg',
  email: 'jiamincheng@nyu.edu',
  /** Path under /public. Replace with your real CV. */
  cvPdf: '/cv.pdf',
}

export type Profile = typeof profile
