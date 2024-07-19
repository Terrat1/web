import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export type DropdownItemProps = {
  children: ReactNode;
  copyValue?: string;
  onClick?: () => void;
};

export default function DropdownItem({ children, copyValue, onClick }: DropdownItemProps) {
  const dropdownItemClasses = classNames(
    'px-4 py-2 hover:bg-gray-90/50 max-w-full text-ellipsis truncate w-full text-left',
    {
      'cursor-pointer': onClick,
    },
  );

  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }, [copied]);

  return (
    <button type="button" className={dropdownItemClasses} onClick={onClick}>
      {copyValue ? (
        <CopyToClipboard text={copyValue} onCopy={onCopy}>
          <div className="flex w-full cursor-pointer flex-row items-center justify-between gap-4">
            <span className="truncate ">{children}</span>
            <i className={copied ? 'text-green-50' : 'text-gray-50'}>
              <Icon
                name={copied ? 'checkmark' : 'copy'}
                color="currentColor"
                width="1rem"
                height="1rem"
              />
            </i>
          </div>
        </CopyToClipboard>
      ) : (
        <span className="truncate">{children}</span>
      )}
    </button>
  );
}