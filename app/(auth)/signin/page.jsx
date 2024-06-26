"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const SigninPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();
  useEffect(() => {
    const intercom_auth = localStorage.getItem("auth");
    if (intercom_auth) {
      router.push("/");
    }
  }, [router]);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        localStorage.setItem("auth", resp.data.jwt);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        toast("Welcome back again");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-slate-200">
        <Image src="/logo.png" width={100} height={100} alt="registerlogo" />
        <h2 className="font-bold text-3xl">Signin account</h2>
        <h2>Enter your email and password to Signin to your account</h2>
        <div>
          <div className="flex flex-col w-full mt-7 gap-7">
            <Input
              placeholder="name@example.com"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!password} onClick={() => onSignIn()}>
              {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
            </Button>

            <p>
              New user -
              <Link href={"/register"} className="text-blue-500">
                &nbsp; Register and continue shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
