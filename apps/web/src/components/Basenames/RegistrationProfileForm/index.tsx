import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  textRecordsSocialFieldsEnabled,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { TransactionExecutionError } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';

export enum FormSteps {
  Description = 'description',
  Socials = 'socials',
  Keywords = 'keywords',
}

export default function RegistrationProfileForm() {
  const [currentFormStep, setCurrentFormStep] = useState<FormSteps>(FormSteps.Description);
  const { selectedName } = useRegistration();
  const { address } = useAccount();
  const router = useRouter();
  const { logEventWithContext } = useAnalytics();

  const { data: baseEnsName } = useBaseEnsName({
    address,
  });

  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      address: address,
      username: baseEnsName,
    });

  // Write text records
  const { writeTextRecords, writeTextRecordsIsPending, writeTextRecordsTransactionHash } =
    useWriteBaseEnsTextRecords({
      address: address,
      username: baseEnsName,
    });

  // Wait for text record transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
  } = useWaitForTransactionReceipt({
    hash: writeTextRecordsTransactionHash,
    query: {
      enabled: !!writeTextRecordsTransactionHash,
    },
  });

  const [textRecords, setTextRecords] = useState<UsernameTextRecords>(existingTextRecords);

  useEffect(() => {
    if (transactionIsFetching) {
      logEventWithContext('update_text_records_transaction_processing', ActionType.change);
    }
    if (transactionIsSuccess) {
      // TODO: This can be a failed transaction
      if (transactionData.status === 'success') {
        logEventWithContext('update_text_records_transaction_success', ActionType.change);

        refetchExistingTextRecords()
          .then(() => {
            router.push(`names/${selectedName}`);
          })
          .catch(() => {});
      }

      if (transactionData.status === 'reverted') {
        logEventWithContext('update_text_records_transaction_reverted', ActionType.change);

        // TODO: Show an error to the user
      }
    }
  }, [
    refetchExistingTextRecords,
    router,
    selectedName,
    transactionIsSuccess,
    transactionIsFetching,
    transactionData,
    logEventWithContext,
  ]);

  useEffect(() => {
    setTextRecords(existingTextRecords);
  }, [existingTextRecords]);

  const updateTextRecords = useCallback((key: UsernameTextRecordKeys, value: string) => {
    setTextRecords((previousTextRecords) => {
      return {
        ...previousTextRecords,
        [key]: value,
      };
    });
  }, []);

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) {
        setCurrentFormStep(FormSteps.Socials);
      }

      if (currentFormStep === FormSteps.Socials) {
        setCurrentFormStep(FormSteps.Keywords);
      }

      if (currentFormStep === FormSteps.Keywords) {
        logEventWithContext('update_text_records_transaction_initiated', ActionType.change);
        writeTextRecords(textRecords)
          .then((result) => {
            // We updated some text records
            if (result) {
              logEventWithContext('update_text_records_transaction_approved', ActionType.change);
            } else {
              // no text records had to be updated, simply go to profile
              router.push(`names/${selectedName}`);
            }
          })
          .catch((error) => {
            let errorReason = 'unknown';
            if (error instanceof TransactionExecutionError) {
              errorReason = error.details;
            }

            logEventWithContext('update_text_records_transaction_canceled', ActionType.click, {
              error: errorReason,
            });
            // TODO: Show an error
          });
      }

      event.preventDefault();
    },
    [currentFormStep, logEventWithContext, router, selectedName, textRecords, writeTextRecords],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const formClasses = classNames(
    'flex flex-col justify-between gap-4 text-gray-60 md:items-center rounded-3xl shadow-xl p-8',
  );

  const descriptionLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <p className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Bio</strong>
        </div>
        <span className="font-normal">Step 1 of 3</span>
      </p>
    </div>
  );

  const socialsLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <p className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Socials</strong>
        </div>
        <span className="font-normal">Step 2 of 3</span>
      </p>
    </div>
  );

  const keywordsLabelChildren = (
    <div className="mb-2 flex w-full cursor-pointer flex-col">
      <p className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add areas of expertise</strong>
        </div>
        <span className="font-normal">Step 3 of 3</span>
      </p>
    </div>
  );

  const isLoading =
    existingTextRecordsIsLoading || writeTextRecordsIsPending || transactionIsFetching;

  useEffect(() => {
    logEventWithContext(`registration_profile_form_step_${currentFormStep}`, ActionType.change);
  }, [currentFormStep, logEventWithContext]);

  return (
    <form className={formClasses}>
      {currentFormStep === FormSteps.Description && (
        <UsernameDescriptionField
          labelChildren={descriptionLabelChildren}
          onChange={onChangeTextRecord}
          value={textRecords[UsernameTextRecordKeys.Description]}
          disabled={isLoading}
        />
      )}
      {currentFormStep === FormSteps.Socials && (
        <Fieldset>
          <Label>{socialsLabelChildren}</Label>
          {textRecordsSocialFieldsEnabled.map((textRecordKey) => (
            <UsernameTextRecordInlineField
              key={textRecordKey}
              textRecordKey={textRecordKey}
              onChange={onChangeTextRecord}
              value={textRecords[textRecordKey]}
              disabled={isLoading}
            />
          ))}
        </Fieldset>
      )}
      {currentFormStep === FormSteps.Keywords && (
        <div className="mb-2">
          <UsernameKeywordsField
            labelChildren={keywordsLabelChildren}
            onChange={onChangeTextRecord}
            value={textRecords[UsernameTextRecordKeys.Keywords]}
            disabled={isLoading}
          />
        </div>
      )}
      <Button
        variant={ButtonVariants.Black}
        rounded
        fullWidth
        disabled={isLoading}
        isLoading={isLoading}
        onClick={onClickSave}
      >
        {currentFormStep === FormSteps.Keywords ? "I'm done" : 'Next'}
      </Button>
    </form>
  );
}
