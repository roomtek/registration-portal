import React from "react";
import {
  Button,
  HTMLSelect,
  H5,
  NumericInput,
  Card,
  FormGroup,
  InputGroup,
  Toaster,
  Position,
  Icon
} from "@blueprintjs/core";

interface IProps {
  mac?: string;
}

const NPITypes = ["", "Individual", "Organization"];

const ConfrimationText =
  "Thank you for enrolling with us. We have received your application, and will be contacting you shortly. " +
  "For any immediate inquiries please call our helpdesk number 1800-TEMI-TAYO or contact temitayo@odesanmi.xyz";

interface IState {
  loading: boolean;
  completed: boolean;
  firstname: string | undefined;
  lastname: string | undefined;
  npi: string | undefined;
  npitype: string | undefined;
  telephone: string | undefined;
  email: string | undefined;
  street1: string | undefined;
  street2: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: string | undefined;
}

type CE = React.ChangeEvent<HTMLInputElement>;
type SE = React.ChangeEvent<HTMLSelectElement>;

const PEToaster = Toaster.create({
  className: "pe-toast",
  position: Position.TOP,
  maxToasts: 1
});

export class ProviderEnrollment extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      completed: false,
      firstname: "",
      lastname: "",
      npi: "",
      npitype: "",
      telephone: "",
      email: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    };
  }

  resetAll() {
    console.log("resetAll");
    this.setState({
      loading: false,
      firstname: "",
      lastname: "",
      npi: "",
      npitype: "",
      telephone: "",
      email: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    });
  }

  isempty(raw: string | undefined): boolean {
    console.log("isempty : ", raw === undefined || raw.trim().length < 1);
    return raw === undefined || raw.trim().length < 1;
  }

  attemptSubmit() {
    // perform basic validation

    if (
      this.isempty(this.state.firstname) ||
      this.isempty(this.state.lastname) ||
      this.isempty(this.state.npi) ||
      this.isempty(this.state.email) ||
      this.isempty(this.state.telephone) ||
      this.isempty(this.state.street1) ||
      this.isempty(this.state.city) ||
      this.isempty(this.state.state) ||
      this.isempty(this.state.zip)
    ) {
      PEToaster.show({
        message: "Please provide all required fields.",
        intent: "danger"
      });
      return;
    }

    if (this.state.npi?.length !== 10) {
      PEToaster.show({
        message: "Please provide a valid NPI.",
        intent: "danger"
      });
      return;
    }

    this.setState({ loading: true });

    let data = JSON.stringify(this.state);
    console.log("POST object data", data);

    // let endpoint = "https://api.availity.com/v1/.....";
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", endpoint, true);
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     if (xhr.status === 200) {
    //       console.log(xhr.responseText);
    //     } else {
    //       console.log(xhr.responseText);
    //       PEToaster.show({
    //         message: "There has been an error submitting this form",
    //         intent: "danger"
    //       });
    //     }
    //     this.setState({
    //       loading: false
    //     });
    //   }
    // };
    // xhr.send(data);

    setTimeout(() => {
      this.setState({ completed: true, loading: false });
      PEToaster.show({
        message: "Thank you for enrolling with us.",
        intent: "success"
      });
      this.resetAll();
    }, 1000);
  }

  render() {
    let { completed, loading } = this.state;
    return (
      <div className="pe-card">
        <Card>
          {completed && (
            <div className="centerconfirm">
              <div>
                <Icon icon="tick-circle" iconSize={85} intent="success" />
              </div>
              <div style={{ margin: "1rem" }}>{ConfrimationText}</div>
            </div>
          )}

          {!completed && (
            <>
              <H5>Provider Enrollment Application</H5>
              <div className="grid11">
                <FormGroup label="First Name" labelFor="fn-input" labelInfo="*">
                  <InputGroup
                    disabled={loading}
                    id={"fn-input"}
                    fill
                    required
                    value={this.state.firstname}
                    onChange={(e: CE) =>
                      this.setState({ firstname: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="ln-input" labelInfo="*">
                  <InputGroup
                    disabled={loading}
                    id="ln-input"
                    value={this.state.lastname}
                    onChange={(e: CE) =>
                      this.setState({ lastname: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </div>
              <div className="grid11">
                <FormGroup
                  label="NPI Number"
                  labelFor="npi-input"
                  labelInfo="*"
                >
                  <NumericInput
                    id="npi-input"
                    buttonPosition="none"
                    disabled={loading}
                    maxLength={10}
                    min={10}
                    minLength={10}
                    fill
                    placeholder="National Provider Identifier"
                    value={this.state.npi}
                    onValueChange={(n: number, s: string) =>
                      this.setState({ npi: s })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup label="NPI Type" labelFor="npityp-input">
                  <HTMLSelect
                    fill
                    disabled={loading}
                    id="npityp-input"
                    value={this.state.npitype}
                    onChange={(e: SE) =>
                      this.setState({ npitype: e.target.value })
                    }
                    options={NPITypes}
                  ></HTMLSelect>
                </FormGroup>
              </div>
              <div className="grid11">
                <FormGroup
                  label="Email Address"
                  labelFor="email-input"
                  labelInfo="*"
                >
                  <InputGroup
                    disabled={loading}
                    id="email-input"
                    inputMode="email"
                    value={this.state.email}
                    onChange={(e: CE) =>
                      this.setState({ email: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup
                  label="Phone Number"
                  labelFor="phone-input"
                  labelInfo="*"
                >
                  <InputGroup
                    disabled={loading}
                    id="phone-input"
                    inputMode="tel"
                    value={this.state.telephone}
                    onChange={(e: CE) =>
                      this.setState({ telephone: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </div>
              <hr></hr>
              <FormGroup
                helperText="May include a P.O Box Number"
                label="Address Line 1"
                labelFor="addr-input"
                labelInfo="*"
              >
                <InputGroup
                  disabled={loading}
                  id="addr-input"
                  placeholder="Street Address"
                  value={this.state.street1}
                  onChange={(e: CE) =>
                    this.setState({ street1: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup label="Address Line 2" labelFor="addr2-input">
                <InputGroup
                  disabled={loading}
                  id="addr2-input"
                  placeholder="Suite #"
                  value={this.state.street2}
                  onChange={(e: CE) =>
                    this.setState({ street2: e.target.value })
                  }
                />
              </FormGroup>
              <div className="grid111">
                <FormGroup label="City" labelFor="city-input" labelInfo="*">
                  <InputGroup
                    id="city-input"
                    disabled={loading}
                    value={this.state.city}
                    onChange={(e: CE) =>
                      this.setState({ city: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup label="State" labelFor="state-input" labelInfo="*">
                  <InputGroup
                    id="state-input"
                    disabled={loading}
                    value={this.state.state}
                    onChange={(e: CE) =>
                      this.setState({ state: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup
                  label="Postal Code"
                  labelFor="zip-input"
                  labelInfo="*"
                >
                  <InputGroup
                    id="zip-input"
                    disabled={loading}
                    value={this.state.zip}
                    onChange={(e: CE) => this.setState({ zip: e.target.value })}
                  />
                </FormGroup>
              </div>
              <div className="reqf">* Required fields</div>
              <div className="flexout">
                <Button
                  icon="tick"
                  intent="success"
                  loading={loading}
                  onClick={() => this.attemptSubmit()}
                >
                  Submit Application
                </Button>{" "}
                <Button
                  icon="reset"
                  disabled={loading}
                  onClick={() => this.resetAll()}
                >
                  Reset
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }
}
