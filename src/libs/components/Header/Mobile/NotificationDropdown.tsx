// Toast notifications
import { toast } from 'react-toastify';

interface NotificationDropdownProps {
  showNotificationDropdown: boolean;
}

export default function NotificationDropdown({
  showNotificationDropdown,
}: NotificationDropdownProps) {
  return (
    <div
      className={`menuitem_submenu_wrapper notification-dropdown ${
        showNotificationDropdown ? 'active' : ''
      }`}
      style={{
        height: showNotificationDropdown ? 42 : 0,
        transition: 'height 0.3s ease-in-out',
      }}
    >
      <div className="inner_borders">
        <div className="notification_submenu">
          <div data-featuretarget="green-envelope-responsive">
            <div className="NotificationHeader ResponsiveViewAll">
              <button className="AllNotificationsButton" onClick={() => toast.info(`Coming soon.`)}>
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
