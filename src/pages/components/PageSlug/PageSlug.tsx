import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import { PageErrorFragment } from "@saleor/pages/types/PageErrorFragment";
import { getFormErrors } from "@saleor/utils/errors";
import getPageErrorMessage from "@saleor/utils/errors/page";
import React from "react";
import { useIntl } from "react-intl";
import slugify from "slugify";

import { FormData } from "../PageDetailsPage";

export interface PageSlugProps {
  data: FormData;
  disabled: boolean;
  errors: PageErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const PageSlug: React.FC<PageSlugProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["slug"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "URL"
        })}
      />
      <CardContent>
        <TextField
          name={"slug" as keyof FormData}
          disabled={disabled}
          error={!!formErrors.slug}
          label={intl.formatMessage({
            defaultMessage: "Slug",
            description: "page internal name"
          })}
          helperText={
            getPageErrorMessage(formErrors.slug, intl) ||
            intl.formatMessage({
              defaultMessage:
                "If empty, URL will be autogenerated from Page Name"
            })
          }
          placeholder={slugify(data.title)}
          value={data.slug}
          onChange={onChange}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};
PageSlug.displayName = "PageSlug";
export default PageSlug;
