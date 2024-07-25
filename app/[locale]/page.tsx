import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import initTranslations from "../i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";
import LanguageChanger from "@/components/LangaugeChanger";

const i18nNamespaces = ['homepage', "commonpage"];

const Home = async({ searchParams, params }: SearchParamProps & {params: {locale: string}}) => {
  const isAdmin = searchParams?.admin === "true";
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <LanguageChanger/>
      <div className="flex h-screen max-h-screen">
        {isAdmin && <PasskeyModal />}

        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />

            <PatientForm />

            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                {/* © 2024 CarePluse */}
                {t('commonpage:common')}
              </p>
              <Link href="/?admin=true" className="text-green-500">
                {/* Admin */}
                {t('admin')}
              </Link>
            </div>
          </div>
        </section>

        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[50%]"
        />
      </div>
    </TranslationsProvider>
  );
};

export default Home;
