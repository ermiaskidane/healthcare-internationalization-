import Image from "next/image";
import Link from "next/link";

import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const i18nNamespaces = ["success", "commonpage"]

const RequestSuccess = async ({
  searchParams,
  params: { userId, locale },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  const { t } = await initTranslations(locale, i18nNamespaces);

  // TO-DO: Sentry metric if needed
  // Sentry.metrics.set("user_view_appointment_success", user.name)

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
          {t('title-1')} <span className="text-green-500">{t('title-2')}</span> {t('title-3')}
          </h2>
          <p>{t('success-des')}</p>
        </section>

        <section className="request-details">
          <p>{t('requested-appointment')} </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">{t('dr-title')} {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            {t('new-appointment')}
          </Link>
        </Button>

        <p className="copyright">{t('commonpage:common')}</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
