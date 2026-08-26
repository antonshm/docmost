import SettingsTitle from "@/components/settings/settings-title.tsx";
import WorkspaceNameForm from "@/features/workspace/components/settings/components/workspace-name-form";
import WorkspaceIcon from "@/features/workspace/components/settings/components/workspace-icon.tsx";
import { useTranslation } from "react-i18next";
import { isCloud } from "@/lib/config.ts";
import ManageHostname from "@/ee/components/manage-hostname.tsx";
import { Divider } from "@mantine/core";
import AllowMemberTemplates from "@/ee/security/components/allow-member-templates.tsx";
import WorkspaceDefaultPageEditMode from "@/features/workspace/components/settings/components/workspace-default-page-edit-mode.tsx";
import PersonalSpacesSetting from "@/ee/personal-space/components/personal-spaces-setting.tsx";
import { DocumentTitle } from "@/components/ui/document-title.tsx";
import { useHasFeature } from "@/ee/hooks/use-feature";
import { Feature } from "@/ee/features";

export default function WorkspaceSettings() {
  const { t } = useTranslation();
  const hasTemplates = useHasFeature(Feature.TEMPLATES);
  const hasPersonalSpaces = useHasFeature(Feature.PERSONAL_SPACES);

  return (
    <>
      <DocumentTitle title="Workspace Settings" />
      <SettingsTitle title={t("General")} />
      <WorkspaceIcon />
      <WorkspaceNameForm />

      {hasTemplates && (
        <>
          <Divider my="md" />
          <AllowMemberTemplates />
        </>
      )}

      {hasPersonalSpaces && (
        <>
          <Divider my="md" />
          <PersonalSpacesSetting />
        </>
      )}

      {isCloud() && (
        <>
          <Divider my="md" />
          <ManageHostname />
        </>
      )}

      <Divider my="md" />
      <WorkspaceDefaultPageEditMode />
    </>
  );
}
