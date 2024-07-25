import Image from "next/image";
import { redirect } from "next/navigation";
import initTranslations from "@/app/i18n";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import TranslationsProvider from "@/providers/TranslationsProvider";

const i18nNamespaces = ["register", "commonpage"]

const Register = async ({ params: { userId, locale } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">{t('commonpage:common')}</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
    </TranslationsProvider>
  );
};

export default Register;
