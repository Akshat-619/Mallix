import React from 'react';
import './EmailSection.scss';

// Fake email data
const EMAIL_DATA = [
  {
    id: 1,
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: 'Security alert: new sign-in to your account',
    preview: 'We noticed a new sign-in to your GitHub account from a device...',
    time: '10:30 AM',
    date: 'Jan 22, 2026',
    isRead: false,
    isStarred: true,
    isImportant: true,
    hasAttachment: true,
    category: 'primary',
    avatar: 'GH',
    avatarColor: '#24292e'
  },
  {
    id: 2,
    sender: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: 'You have 5 new profile views',
    preview: 'Your profile is getting noticed! 5 people viewed your profile...',
    time: '9:15 AM',
    date: 'Jan 22, 2026',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'social',
    avatar: 'LI',
    avatarColor: '#0077b5'
  },
  {
    id: 3,
    sender: 'Amazon Web Services',
    senderEmail: 'aws@amazon.com',
    subject: 'AWS Monthly Bill - January 2026',
    preview: 'Your AWS bill for January 2026 is now available. Total amount...',
    time: '8:45 AM',
    date: 'Jan 22, 2026',
    isRead: true,
    isStarred: false,
    isImportant: true,
    hasAttachment: true,
    category: 'updates',
    avatar: 'AW',
    avatarColor: '#ff9900'
  },
  {
    id: 4,
    sender: 'Slack',
    senderEmail: 'team@slack.com',
    subject: 'New message in #development-team',
    preview: 'John: Hey team, I just pushed the latest updates to the repo...',
    time: '7:30 AM',
    date: 'Jan 22, 2026',
    isRead: true,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    category: 'work',
    avatar: 'S',
    avatarColor: '#4a154b'
  },
  {
    id: 5,
    sender: 'Google Drive',
    senderEmail: 'drive@ google.com',
    subject: 'Storage space running low',
    preview: 'Your Google Drive storage is 85% full. Consider upgrading...',
    time: 'Yesterday',
    date: 'Jan 21, 2026',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'updates',
    avatar: 'GD',
    avatarColor: '#4285f4'
  },
  {
    id: 6,
    sender: 'Twitter',
    senderEmail: 'notifications@twitter.com',
    subject: 'Your tweet got 50 retweets!',
    preview: 'Your recent tweet about web development is trending...',
    time: 'Yesterday',
    date: 'Jan 21, 2026',
    isRead: false,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    category: 'social',
    avatar: 'T',
    avatarColor: '#1da1f2'
  },
  {
    id: 7,
    sender: 'Netflix',
    senderEmail: 'info@netflix.com',
    subject: 'New episodes available',
    preview: 'New episodes of your favorite shows are now available...',
    time: '2 days ago',
    date: 'Jan 20, 2026',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'entertainment',
    avatar: 'N',
    avatarColor: '#e50914'
  },
  {
    id: 8,
    sender: 'Microsoft Teams',
    senderEmail: 'teams@microsoft.com',
    subject: 'Meeting reminder: Project Review',
    preview: 'Don\'t forget about your project review meeting scheduled for...',
    time: '3 days ago',
    date: 'Jan 19, 2026',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: true,
    category: 'work',
    avatar: 'MT',
    avatarColor: '#5b5fc7'
  },
  {
    id: 9,
    sender: 'Spotify',
    senderEmail: 'no-reply@spotify.com',
    subject: 'Your 2025 Wrapped is ready!',
    preview: 'See your top artists, songs, and listening habits from 2025...',
    time: '1 week ago',
    date: 'Jan 15, 2026',
    isRead: true,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    category: 'entertainment',
    avatar: 'S',
    avatarColor: '#1db954'
  },
  {
    id: 10,
    sender: 'Dropbox',
    senderEmail: 'notifications@dropbox.com',
    subject: 'Shared folder with you',
    preview: 'Sarah shared 3 files with you in the project folder...',
    time: '2 weeks ago',
    date: 'Jan 8, 2026',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: true,
    category: 'updates',
    avatar: 'DB',
    avatarColor: '#0061ff'
  },
  {
    id: 11,
    sender: 'Zoom',
    senderEmail: 'support@zoom.us',
    subject: 'Your monthly usage report',
    preview: 'You used 12.5 hours of Zoom meetings this month...',
    time: '3 weeks ago',
    date: 'Jan 1, 2026',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'updates',
    avatar: 'Z',
    avatarColor: '#2d8cff'
  },
  {
    id: 12,
    sender: 'Discord',
    senderEmail: 'noreply@discord.com',
    subject: 'New friend request',
    preview: 'Alex wants to be your friend on Discord. Click to accept...',
    time: '1 month ago',
    date: 'Dec 22, 2025',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'social',
    avatar: 'D',
    avatarColor: '#5865f2'
  },
  {
    id: 13,
    sender: 'Adobe Creative Cloud',
    senderEmail: 'adobe@adobe.com',
    subject: 'Subscription renewal reminder',
    preview: 'Your Creative Cloud subscription will renew on Feb 1, 2026...',
    time: '1 month ago',
    date: 'Dec 20, 2025',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    category: 'updates',
    avatar: 'AC',
    avatarColor: '#ff0000'
  },
  {
    id: 14,
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: 'Pull request merged',
    preview: 'Your pull request #42 has been successfully merged into main...',
    time: '1 month ago',
    date: 'Dec 18, 2025',
    isRead: true,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    category: 'work',
    avatar: 'GH',
    avatarColor: '#24292e'
  },
  {
    id: 15,
    sender: 'Figma',
    senderEmail: 'team@figma.com',
    subject: 'Design file updated',
    preview: 'John updated the homepage design file. Latest changes include...',
    time: '2 months ago',
    date: 'Nov 22, 2025',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: true,
    category: 'work',
    avatar: 'F',
    avatarColor: '#f24e1e'
  },
  {
    id: 16,
    sender: 'Notion',
    senderEmail: 'team@notion.so',
    subject: 'Workspace invite',
    preview: 'You\'ve been invited to join the "Product Team 2026" workspace...',
    time: '2 months ago',
    date: 'Nov 15, 2025',
    isRead: true,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'work',
    avatar: 'N',
    avatarColor: '#000000'
  },
  {
    id: 17,
    sender: 'Uber',
    senderEmail: 'rides@uber.com',
    subject: 'Your ride history is available',
    preview: 'Your monthly ride history for December 2025 is now available...',
    time: '3 months ago',
    date: 'Oct 22, 2025',
    isRead: false,
    isStarred: false,
    isImportant: false,
    hasAttachment: false,
    category: 'updates',
    avatar: 'U',
    avatarColor: '#000000'
  },
  {
    id: 18,
    sender: 'Medium',
    senderEmail: 'team@medium.com',
    subject: 'Your story is trending',
    preview: 'Your story "Building Modern Web Apps" is getting traction...',
    time: '3 months ago',
    date: 'Oct 15, 2025',
    isRead: true,
    isStarred: true,
    isImportant: false,
    hasAttachment: false,
    category: 'social',
    avatar: 'M',
    avatarColor: '#000000'
  },
  {
    id: 19,
    sender: 'Airbnb',
    senderEmail: 'host@airbnb.com',
    subject: 'New booking confirmed',
    preview: 'Congratulations! Your property has been booked for Jan 25-28, 2026...',
    time: '4 months ago',
    date: 'Sep 22, 2025',
    isRead: false,
    isStarred: false,
    isImportant: true,
    hasAttachment: true,
    category: 'updates',
    avatar: 'AB',
    avatarColor: '#ff5a5f'
  },
  {
    id: 20,
    sender: 'PayPal',
    senderEmail: 'paypal@paypal.com',
    subject: 'Payment received',
    preview: 'You received $250.00 from John Doe for web design services...',
    time: '5 months ago',
    date: 'Aug 22, 2025',
    isRead: true,
    isStarred: false,
    isImportant: true,
    hasAttachment: false,
    category: 'updates',
    avatar: 'PP',
    avatarColor: '#003087'
  }
];

const EmailSection = () => {
  return (
    <div className="email-section mt-3 mb-3 ">
      <div className="email-header">
        <div className="header-left">
          <h2 className="email-title">Inbox</h2>
          <span className="email-count">20 emails</span>
        </div>
        <div className="header-right">
          <button className="btn-refresh">
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <button className="btn-filter">
            <i className="bi bi-funnel"></i>
          </button>
        </div>
      </div>
      
      <div className="email-list ">
        {EMAIL_DATA.map((email) => (
          <div key={email.id} className={`email-item ${!email.isRead ? 'unread' : ''}`}>
            <div className="email-avatar" style={{ backgroundColor: email.avatarColor }}>
              <span className="avatar-text">{email.avatar}</span>
            </div>
            
            <div className="email-content">
              <div className="email-top">
                <div className="email-sender">
                  <span className="sender-name">{email.sender}</span>
                  <span className="sender-email">{email.senderEmail}</span>
                </div>
                <div className="email-meta">
                  <span className="email-time">{email.time}</span>
                  <div className="email-actions">
                    {email.isStarred && <i className="bi bi-star-fill starred"></i>}
                    {email.isImportant && <i className="bi bi-exclamation-circle important"></i>}
                    {email.hasAttachment && <i className="bi bi-paperclip attachment"></i>}
                  </div>
                </div>
              </div>
              
              <div className="email-subject">{email.subject}</div>
              <div className="email-preview">{email.preview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailSection;
