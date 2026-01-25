import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EmailView.scss';

// Extended email data with full content
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
    avatarColor: '#24292e',
    fullContent: `Hi there,

We noticed a new sign-in to your GitHub account from a device you haven't used before.

Device Details:
- Device: Chrome on Windows
- Location: New York, NY
- IP Address: 192.168.1.1
- Time: January 22, 2026 at 10:30 AM EST

If this was you, you can safely ignore this email. If you didn't sign in recently, please secure your account immediately:

1. Change your password
2. Enable two-factor authentication
3. Review your account activity
4. Revoke any unauthorized access

Stay safe,
The GitHub Security Team`,
    attachments: [
      { 
        name: 'security_report.pdf', 
        size: '245 KB',
        type: 'pdf',
        preview: '📄 Security report with detailed analysis of the sign-in attempt and recommended actions.'
      },
      { 
        name: 'login_activity.csv', 
        size: '12 KB',
        type: 'csv',
        preview: '📊 CSV file containing your recent login history with timestamps and locations.'
      }
    ]
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
    avatarColor: '#0077b5',
    fullContent: `Good news!

Your profile is getting noticed! 5 people viewed your profile in the last week.

Who viewed your profile:
1. Sarah Johnson - Senior Developer at Tech Corp
2. Michael Chen - Engineering Manager at StartupXYZ
3. Emily Davis - HR Director at Digital Solutions
4. Alex Thompson - CTO at InnovateLabs
5. Jessica Lee - Product Manager at CloudTech

Update your profile to make the best impression:
- Add recent projects and accomplishments
- Update your skills and endorsements
- Request recommendations from colleagues

Keep growing your network!
The LinkedIn Team`,
    attachments: []
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
    avatarColor: '#ff9900',
    fullContent: `Dear Customer,

Your AWS bill for January 2026 is now available.

Billing Summary:
- Total Amount Due: $1,234.56
- Payment Due Date: February 15, 2026
- Account Number: 1234-5678-9012

Service Breakdown:
- EC2 Instances: $456.78
- S3 Storage: $234.56
- RDS Database: $345.67
- Lambda Functions: $123.45
- Data Transfer: $74.10

Cost Optimization Tips:
- Consider using Reserved Instances for EC2
- Implement S3 lifecycle policies
- Review unused resources regularly

View your detailed bill and manage payment methods in the AWS Console.

Thank you for choosing AWS!
AWS Billing Team`,
    attachments: [
      { 
        name: 'AWS_Bill_January_2026.pdf', 
        size: '1.2 MB',
        type: 'pdf',
        preview: '📄 Detailed AWS billing statement for January 2026 with service breakdown and cost analysis.'
      },
      { 
        name: 'cost_breakdown.xlsx', 
        size: '456 KB',
        type: 'xls',
        preview: '📈 Excel spreadsheet with detailed cost breakdown by service and usage metrics.'
      }
    ]
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
    avatarColor: '#4a154b',
    fullContent: `New messages in #development-team:

John Doe • 7:30 AM
Hey team, I just pushed the latest updates to the repo. The new features include:
- Enhanced user authentication
- Performance optimizations
- Bug fixes for the dashboard

Please review and test when you get a chance.

Jane Smith • 8:15 AM
Great work! I'll start testing the authentication flow this morning.

Mike Johnson • 9:00 AM
I've already found a small issue with the dashboard loading. Created a ticket #1234.

You can view the full conversation and reply in Slack.

Stay connected,
The Slack Team`,
    attachments: []
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
    avatarColor: '#4285f4',
    fullContent: `Hi there,

Your Google Drive storage is 85% full. Here's your current usage:

Storage Usage:
- Used: 17.0 GB of 20 GB
- Available: 3.0 GB
- Large files taking up space:
  - vacation_photos.zip (2.5 GB)
  - project_backup.tar (1.8 GB)
  - old_documents.rar (1.2 GB)

Options to free up space:
1. Delete large files you no longer need
2. Empty your trash
3. Upgrade to Google One for more storage

Upgrade Options:
- 100 GB: $1.99/month
- 200 GB: $2.99/month
- 2 TB: $9.99/month

Take action now to avoid running out of storage!

Best,
The Google Drive Team`,
    attachments: []
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
    avatarColor: '#1da1f2',
    fullContent: `🎉 Congratulations!

Your tweet is getting amazing engagement!

Tweet Performance:
- 50 retweets
- 200 likes
- 15 comments
- 1,200 impressions

Your tweet: "Just discovered an amazing CSS trick for responsive design. Game changer for mobile layouts! #webdev #css #frontend"

Keep sharing your insights with the community. Your expertise is helping developers worldwide!

Trending in #webdev community,
Twitter Team`,
    attachments: []
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
    avatarColor: '#e50914',
    fullContent: `New episodes just dropped! 🍿

Based on your viewing history, you might love:

Stranger Things - Season 5 Episodes 1-3
The latest season continues the adventure as the face faces their biggest challenge yet.

The Crown - Final Season Episodes 4-6
The epic conclusion to the award-winning series about the British monarchy.

Wednesday - Season 2 Episodes 1-4
Wednesday Addams returns with more mysteries and dark humor at Nevermore Academy.

Start watching now! These episodes are available in 4K Ultra HD with Dolby Atmos sound.

Happy streaming,
Netflix Entertainment Team`,
    attachments: []
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
    avatarColor: '#5b5fc7',
    fullContent: `Meeting Reminder 📅

You have an upcoming meeting:

Project Review Meeting
Date: January 25, 2026
Time: 2:00 PM - 3:30 PM EST
Location: Microsoft Teams (Virtual)

Agenda:
1. Q1 Project Status Update
2. Budget Review and Approval
3. Timeline Adjustments
4. Team Performance Discussion
5. Next Steps and Action Items

Required Attendees:
- You (Project Manager)
- Sarah Chen (Lead Developer)
- Mike Johnson (UX Designer)
- Emily Davis (QA Lead)

Meeting Link: https://teams.microsoft.com/l/meetup-join/19:meeting_xyz

Please come prepared with your status reports and any blockers you're facing.

See you there!
Microsoft Teams`,
    attachments: [
      { 
        name: 'project_agenda.pdf', 
        size: '156 KB',
        type: 'pdf',
        preview: '📄 Detailed meeting agenda with discussion points and time allocations.'
      },
      { 
        name: 'budget_review.xlsx', 
        size: '234 KB',
        type: 'xls',
        preview: '📈 Budget spreadsheet with Q1 expenditures and projections.'
      }
    ]
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
    avatarColor: '#1db954',
    fullContent: `🎵 Your 2025 Wrapped is here!

Your Year in Music:
- Total listening time: 42,195 minutes
- Songs played: 8,234
- Artists discovered: 156
- Top genre: Indie Pop

Your Top Artists of 2025:
1. The Weeknd
2. Taylor Swift
3. Billie Eilish
4. Post Malone
5. Dua Lipa

Your Top Songs:
1. "Blinding Lights" - The Weeknd
2. "Anti-Hero" - Taylor Swift
3. "Heat Waves" - Glass Animals
4. "Stay" - The Kid LAROI & Justin Bieber
5. "Good 4 U" - Olivia Rodrigo

Your Audio Aura: Energetic & Dreamy
You're 73% more energetic than the average listener!

Share your Wrapped story with friends and see how your music taste compares.

Keep listening,
Spotify`,
    attachments: []
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
    avatarColor: '#0061ff',
    fullContent: `Files shared with you! 📁

Sarah Chen has shared 3 files with you:

Project Files Shared:
- design_mockups.fig (45 MB)
- requirements.doc (2.1 MB)
- timeline.pdf (890 KB)

Folder: Q1 2026 Marketing Campaign
Shared on: January 8, 2026 at 3:45 PM

Message from Sarah:
"Hi! I've uploaded the latest design mockups and project requirements for our Q1 campaign. Please review and let me know if you need any changes. The timeline is tight, so we should finalize these by end of week."

View and download these files from your Dropbox:
https://www.dropbox.com/shared/folder/xyz123

Happy collaborating!
Dropbox Team`,
    attachments: [
      { 
        name: 'design_mockups.fig', 
        size: '45 MB',
        type: 'img',
        preview: '🖼️ Figma design file with latest marketing campaign mockups.'
      },
      { 
        name: 'requirements.doc', 
        size: '2.1 MB',
        type: 'doc',
        preview: '📝 Project requirements document with detailed specifications.'
      },
      { 
        name: 'timeline.pdf', 
        size: '890 KB',
        type: 'pdf',
        preview: '📄 Project timeline with milestones and deliverables.'
      }
    ]
  }
];

const EmailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Find the email by ID
    const foundEmail = EMAIL_DATA.find(e => e.id === parseInt(id));
    setEmail(foundEmail);
    setLoading(false);
  }, [id]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'csv': return '📊';
      case 'doc': return '📝';
      case 'xls': return '📈';
      case 'img': return '🖼️';
      case 'zip': return '📦';
      default: return '📎';
    }
  };

  const openPreview = (attachment) => {
    setPreviewAttachment(attachment);
  };

  const closePreview = () => {
    setPreviewAttachment(null);
  };

  if (loading) {
    return (
      <div className="email-view loading">
        <div className="loading-spinner">
          <i className="bi bi-arrow-clockwise"></i>
        </div>
      </div>
    );
  }

  if (!email) {
    return null; // Return null instead of not found component
  }

  return (
    <div className="email-view">
      <div className="email-view-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/home')}>
            <i className="bi bi-arrow-left"></i>
            <span className="btn-text">Back to Inbox</span>
          </button>
        </div>
        
        <div className="header-right">
          <div className="email-actions">
            <button className="btn-action" title="Archive">
              <i className="bi bi-archive"></i>
            </button>
            <button className="btn-action" title="Report Spam">
              <i className="bi bi-exclamation-triangle"></i>
            </button>
            <button className="btn-action" title="Delete">
              <i className="bi bi-trash"></i>
            </button>
            <button className="btn-action" title="Mark as Unread">
              <i className="bi bi-envelope"></i>
            </button>
            <button className="btn-action" title="Snooze">
              <i className="bi bi-clock"></i>
            </button>
            <div className="divider"></div>
            <button className={`btn-action ${email?.isStarred ? 'starred' : ''}`} title="Star">
              <i className={`bi ${email?.isStarred ? 'bi-star-fill' : 'bi-star'}`}></i>
            </button>
            <button className="btn-action" title="More">
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="mobile-hamburger"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className={`bi ${showMobileMenu ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="mobile-menu-overlay" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h5>Email Actions</h5>
              <button 
                className="btn-close"
                onClick={() => setShowMobileMenu(false)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="mobile-menu-content">
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-archive me-2"></i> Archive
              </button>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-exclamation-triangle me-2"></i> Report Spam
              </button>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-trash me-2"></i> Delete
              </button>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-envelope me-2"></i> Mark as Unread
              </button>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-clock me-2"></i> Snooze
              </button>
              <div className="mobile-divider"></div>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className={`bi ${email?.isStarred ? 'bi-star-fill' : 'bi-star'} me-2`}></i> 
                {email?.isStarred ? 'Unstar' : 'Star'}
              </button>
              <button className="mobile-menu-item" onClick={() => { setShowMobileMenu(false); }}>
                <i className="bi bi-three-dots me-2"></i> More
              </button>
              <div className="mobile-divider"></div>
              <button className="mobile-menu-item back-to-inbox" onClick={() => { navigate('/home'); }}>
                <i className="bi bi-arrow-left me-2"></i> Back to Inbox
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="email-view-content">
        <div className="email-subject">
          <h1>{email.subject}</h1>
        </div>

        <div className="email-meta">
          <div className="sender-info">
            <div className="sender-avatar" style={{ backgroundColor: email.avatarColor }}>
              <span className="avatar-text">{email.avatar}</span>
            </div>
            <div className="sender-details">
              <div className="sender-name">{email.sender}</div>
              <div className="sender-email">{email.senderEmail}</div>
            </div>
          </div>
          
          <div className="email-datetime">
            <div className="email-date">{email.date}</div>
            <div className="email-time">{email.time}</div>
          </div>
        </div>

        <div className="email-body">
          <div className="email-content">
            {email.fullContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {email.attachments && email.attachments.length > 0 && (
            <div className="email-attachments">
              <h4>
                <i className="bi bi-paperclip"></i>
                Attachments ({email.attachments.length})
              </h4>
              <div className="attachments-list">
                {email.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-item">
                    <div className="attachment-icon">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="attachment-info">
                      <div className="attachment-name">{attachment.name}</div>
                      <div className="attachment-size">{attachment.size}</div>
                      <div className="attachment-preview">{attachment.preview}</div>
                    </div>
                    <div className="attachment-actions">
                      <button 
                        className="btn-preview"
                        onClick={() => openPreview(attachment)}
                        title="Preview"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn-download" title="Download">
                        <i className="bi bi-download"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="email-reply-section">
          <div className="reply-actions">
            <button className="btn-reply">
              <i className="bi bi-reply"></i>
              Reply
            </button>
            <button className="btn-reply-all">
              <i className="bi bi-reply-all"></i>
              Reply All
            </button>
            <button className="btn-forward">
              <i className="bi bi-forward"></i>
              Forward
            </button>
          </div>
        </div>
      </div>

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div className="attachment-preview-modal" onClick={closePreview}>
          <div className="preview-container" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <div className="preview-title">
                <span className="file-icon">{getFileIcon(previewAttachment.type)}</span>
                <span className="file-name">{previewAttachment.name}</span>
                <span className="file-size">{previewAttachment.size}</span>
              </div>
              <button className="btn-close-preview" onClick={closePreview}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="preview-content">
              {previewAttachment.type === 'pdf' && (
                <div className="pdf-preview">
                  <div className="pdf-placeholder">
                    <i className="bi bi-file-earmark-pdf"></i>
                    <h3>PDF Document</h3>
                    <p>{previewAttachment.preview}</p>
                    <div className="pdf-pages">
                      <div className="pdf-page">Page 1 of 5</div>
                    </div>
                  </div>
                </div>
              )}
              {previewAttachment.type === 'csv' && (
                <div className="csv-preview">
                  <div className="csv-placeholder">
                    <i className="bi bi-file-earmark-spreadsheet"></i>
                    <h3>Spreadsheet Data</h3>
                    <p>{previewAttachment.preview}</p>
                    <div className="csv-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Device</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Jan 22, 2026</td><td>10:30 AM</td><td>New York, NY</td><td>Chrome</td></tr>
                          <tr><td>Jan 21, 2026</td><td>2:15 PM</td><td>San Francisco, CA</td><td>Safari</td></tr>
                          <tr><td>Jan 20, 2026</td><td>9:45 AM</td><td>London, UK</td><td>Firefox</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {previewAttachment.type === 'img' && (
                <div className="image-preview">
                  <img src={`https://picsum.photos/seed/${previewAttachment.name}/800/600.jpg`} alt={previewAttachment.name} />
                </div>
              )}
              {!['pdf', 'csv', 'img'].includes(previewAttachment.type) && (
                <div className="default-preview">
                  <div className="default-placeholder">
                    <i className="bi bi-file-earmark"></i>
                    <h3>File Preview</h3>
                    <p>{previewAttachment.preview}</p>
                    <button className="btn-open-externally">
                      <i className="bi bi-box-arrow-up-right"></i>
                      Open with default application
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="preview-footer">
              <button className="btn-download-full">
                <i className="bi bi-download"></i>
                Download {previewAttachment.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailView;
