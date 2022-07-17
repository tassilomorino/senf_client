/** @format */
import React from "react";

import { useTranslation } from "react-i18next";
import { DatePicker, ActionModal } from "senf-atomic-design-system";

const InlineDatePickerModal = ({
  calendarOpen,
  setCalendarOpen,
  handleChangeCalendar,
  handleCloseCalendar,
  handleSaveCalendar,
  selectedDays,
}) => {
  const { t } = useTranslation();

  return (
    <ActionModal
      title={t("add_date")}
      openModal={calendarOpen}
      setOpenModal={setCalendarOpen}
      handleClose={handleCloseCalendar}
      handleSave={handleSaveCalendar}
      disabledSaveButton={selectedDays.length === 0}
      cancelButtonText={t("cancel")}
      saveButtonText={t("save")}
    >
      <p style={{ widthh: "100%", textAlign: "center" }}>
        {t("first_date_then_time")}
      </p>

      <DatePicker
        handleChangeCalendar={handleChangeCalendar}
        selectedDays={selectedDays}
      />
    </ActionModal>
  );
};

export default InlineDatePickerModal;
